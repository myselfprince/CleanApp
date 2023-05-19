import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import storage from '@react-native-firebase/storage';

import ImageResizer from 'react-native-image-resizer';

export default function Header(props) {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const [imageData, setImageData] = useState('');
  const [location, setLocation] = useState('');
  const [takePhotoClicked, setTakePhotoClicked] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    console.log(newCameraPermission);
  };

  const showAlert = () => {
    Alert.alert(
      'Uploaded Successfully',
      'Image and Location Uploaded Successfully to Firebase Database.',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ]
    );
  };

  // const uploadLocation = async (location) => {
  //   try {
  //     const reference = storage().ref(`locations/${Date.now()}.txt`);
  //     await reference.putString(location);
  
  //     console.log('Location uploaded successfully');
  //     uploadImage();
  //   } catch (error) {
  //     console.error('Error uploading location:', error);
  //   }
  // };

  const uploadLocation = async (location) => {
    try {
      const reference = storage().ref(`locations/${Date.now()}.txt`);
      await reference.putString(location);
  
    } catch (error) {
      console.error('Error uploading location:', error);
    }
  };

  const handleConfirmClick = () => {
    setTakePhotoClicked(true);
  };

  const handleUploadImage = () => {
    uploadImage();
  };
  

  const uploadImage = async () => {
    // console.log(imageData);
    // console.log('Done');

    const resizedImage = await resizeImage(imageData);

    const reference = storage().ref(`images/${Date.now()}.jpg`); // Set the desired path and file name for the image

    // Convert the resized image path to a Blob
    const response = await fetch(`file://${resizedImage.path}`);
    const blob = await response.blob();

    // Upload the image file to Firebase Storage
    await reference.put(blob);

    showAlert();
    setImageData("")
    uploadLocation(location);
  };

  const resizeImage = async (imagePath) => {
    const resizedImage = await ImageResizer.createResizedImage(imagePath, 800, 800, 'JPEG', 80);
    return resizedImage;
  };

  const takePicture = async () => {
    if (camera != null) {
      const photo = await camera.current.takePhoto({
        flash: 'off',
      });
      setImageData(photo.path);
      setTakePhotoClicked(false);

      // console.log(photo);
      // console.log(photo.path);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {takePhotoClicked ? (
        <View style={{ flex: 1 }}>
          <Camera ref={camera} style={StyleSheet.absoluteFill} device={device} isActive={true} photo={true} />

          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#FF0037',
              position: 'absolute',
              bottom: 50,
              alignSelf: 'center',
            }}
            onPress={() => {
              takePicture();
            }}
          ></TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {imageData !== '' && <Image source={{ uri: 'file://' + imageData }} style={{ width: 309, height: 550 }} />}


          <TextInput
          style={styles.input}
          placeholder="Enter location"
          placeholderTextColor={"black"}
          value={location}
          onChangeText={setLocation}
        />

          <TouchableOpacity
            style={{
              width: '90%',
              height: 50,
              borderWidth: 1,
              alignSelf: 'center',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={handleConfirmClick}
            // onPress={() => {
              
            //   setTakePhotoClicked(true);
            //   // uploadImage();
            //   uploadLocation(location);
            // }}
          >
            <Text style={{ color: 'black' }}>Confirm & Click Photo</Text>
          </TouchableOpacity>

     {  imageData &&   <TouchableOpacity
            style={{
              width: '90%',
              height: 50,
              borderWidth: 1,
              alignSelf: 'center',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              backgroundColor: 'green',
            }}
            onPress={handleUploadImage}
            // onPress={() => {
            //   uploadImage();
            // }}
          >
            <Text style={{ color: 'white' }}>Upload Image</Text>
          </TouchableOpacity>}


        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '90%',
    color:"black",
    height: 50,
    borderWidth: 1,
    // alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
