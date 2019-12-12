// import React, {useState, useEffect} from 'react';
// import { View, Image, StyleSheet,Button, Text } from 'react-native';

// import ImagePicker from 'react-native-image-picker';


// const ImgPicker = (props) => {

//     const [pickedImage, setPickedImage] = useState()

//     const takeImageHandler =  async () => {
//         const options = {
//             allowsWditing: true,
//             aspect: [16,9],
//             quality: 0.5,
//             noData: true
//           };
//        const image = await ImagePicker.launchImageLibrary(options, response => {
//             console.log('response', response);
//             if (response.uri) {
//               this.setState({ image: response})
//             }
//           })
//           setPickedImage(image.uri);
//           props.onImageTaken(image.uri);
//     }

//     return (
//         <View style={styles.container}>
//             <View style={styles.imageContainer}>
//             {!pickedImage ? (
//                 <Text>No image picked yet</Text>
//             ) : (
//                 <Image 
//                 source={{uri:pickedImage}}
//                 style={styles.previewImage} />
//             )}
              
//             </View>
//             <View>
//                 <Button 
//                 title="Take Image" 
//                 onPress={takeImageHandler}
//                  />
//             </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         width: '100%'
//     },
//     imageContainer: {
//         borderWidth: 1,
//         borderColor: '#f2f2f2',
//         backgroundColor: '#f2f2f2',
//         marginBottom: 10,
//         width: '80%',
//         height: 200
//     },
//     previewImage: {
//         width: '100%',
//         height: '100%'
//     }
// })

// export default ImgPicker;