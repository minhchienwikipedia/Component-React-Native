import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
const RNFS = require('react-native-fs');
const ZipArchive = require('react-native-zip-archive')
const downloadUrl = 'http://lorempixel.com/400/200/';
const downloadLargeUrl = 'http://ipv4.download.thinkbroadband.com/100MB.zip';
const downloadUrlZip = 'http://mangacha.esy.es/server/001-01.zip';
const arrayUrlZip = ['http://mangacha.esy.es/server/001-01.zip','http://mangacha.esy.es/server/001-02.zip']
const path = "file://storage/emulated/0/Download/";
const jobId = -1;
export default class DemoDownload extends Component {
  constructor(props){
    super(props);
    this.state=({
      output: 'Doc folder: ' + RNFS.DocumentDirectoryPath,
      imagePath: {
        uri: ''
      },
      username: '',
      password: '',
      pendingLoginRequest: false,
    });

  }

  downloadFileTest(background, url) {
    if (jobId !== -1) {
      this.setState({ output: 'A download is already in progress' });
    }

    const progress = data => {
      const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
      const text = `Progress ${percentage}%`;
      this.setState({ output: text });
    };

    const begin = res => {
      this.setState({ output: 'Download has begun' });
    };

    const progressDivider = 1;

    this.setState({ imagePath: { uri: '' } });

    // Random file name needed to force refresh...
    const downloadDest = url==downloadUrl?`${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.jpg`:`${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.zip`;
    // const downloadDest = RNFS.DocumentDirectoryPath;

    const ret = RNFS.downloadFile({ fromUrl: url, toFile: downloadDest, begin, progress, background, progressDivider });

    jobId = ret.jobId;

    ret.promise.then(res => {
      this.setState({ output: JSON.stringify(res) });
      this.setState({
        imagePath: { uri: 'file://' + downloadDest },
        filePath: downloadDest
      });
      console.log(downloadDest);
      jobId = -1;
    }).catch(err => {
      this.showError(err)

      jobId = -1;
    });
  }
  //
  // componentWillMount(){
  //   const targetPath = RNFS.DocumentDirectoryPath;
  //   this.setState({ imagePath: { uri: 'file://' + targetPath+'/Mangacha/app_googleplay.png' } });
  // }

  showError(err) {
    this.setState({ output: `ERROR: Code: ${err.code} Message: ${err.message}` });
  }
//   async onDownload(){
//
//     RNFetchBlob.config({
//   fileCache : true,
//  //path: path + 'avatar3.png',
//   type : 'file',
//   // android only options, these options be a no-op on IOS
//   addAndroidDownloads : {
//     useDownloadManager : true,
//     // Show notification when response data transmitted
//     notification : true,
//     // Title of download notification
//     title : 'Great ! Download Success ! :O ',
//     // File description (not notification description)
//     description : 'An image file.',
//     mime : 'image/png',
//     // Make the file scannable  by media scanner
//     meidaScannable : true,
//   }
// })
// .fetch('GET', 'http://www.freelogovectors.net/wp-content/uploads/2013/02/avatar3.png')
// .then((res) => {// the temp file path
// console.log('The file saved to ', res.path());
// this.setState({ imagePath: { uri: 'file://' + res.path() } });
// });
//
//   }

  unZip(){
    const sourcePath  = this.state.filePath;
    const targetPath = RNFS.DocumentDirectoryPath;

    ZipArchive.unzip(sourcePath, targetPath)
  .then(() => {
    this.setState({ output: 'unzip completed!' });
    console.log('unzip completed!' + targetPath)

  })
  .catch((error) => {
    console.log(error)
  })
  }
  render(){
    return(
      <View>
      <TouchableOpacity onPress={this.downloadFileTest.bind(this, true, downloadUrl) }>
      <Text>
      Download Image
      </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.downloadFileTest.bind(this, true, downloadUrlZip ) }>
      <Text>
      Download Zip
      </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.unZip() }>
      <Text>
      Unzip
      </Text>
      </TouchableOpacity>
      <View>
          <Text style={styles.instructions}>{this.state.output}</Text>
          <Image style={styles.image} source={this.state.imagePath}></Image>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  image: {
    width: 400,
    height: 200,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = DemoDownload;
