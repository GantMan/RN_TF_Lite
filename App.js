import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

import { TFLiteImageRecognition } from 'react-native-tensorflow-lite'

export default class MyImageClassifier extends Component {
  constructor() {
    super()
    this.state = {}

    try {
      // Initialize Tensorflow Lite Image Recognizer
      this.classifier = new TFLiteImageRecognition({
        // Your tflite model in assets folder.
        // Currently only non-quant files
        model: 'mobilenet_v1_1.0_224.tflite',
        labels: 'labels.txt'
      })
    } catch (err) {
      alert(err)
    }
  }

  async classifyImage(imagePath) {
    try {
      const results = await this.classifier.recognize({
        // Your image path.
        image: imagePath,
        // the input shape of your model. If none given, it will be default to 224.
        inputShape: 224
      })

      const resultObj = {
        name: 'Name: ' + results[0].name,
        confidence: 'Confidence: ' + results[0].confidence,
        inference: 'Inference: ' + results[0].inference + 'ms'
      }
      this.setState(resultObj)
    } catch (err) {
      alert(err)
    }
  }

  componentWillUnmount() {
    // Must close the classifier when destroying or unmounting component to release object.
    this.classifier.close()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.images}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => this.classifyImage('apple_224.jpg')}
          >
            <Image
              style={styles.image}
              source={require('./images/apple_224.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => this.classifyImage('coffee_224.jpg')}
          >
            <Image
              style={styles.image}
              source={require('./images/coffee_224.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => this.classifyImage('taco_224.jpg')}
          >
            <Image
              style={styles.image}
              source={require('./images/taco_224.jpg')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text>RESULTS:</Text>
          <Text style={styles.results}>{this.state.name}</Text>
          <Text style={styles.results}>{this.state.confidence}</Text>
          <Text style={styles.results}>{this.state.inference}</Text>
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
    backgroundColor: '#F5FCFF'
  },
  results: {
    textAlign: 'center',
    fontSize: 24
  },
  images: {
    flexDirection: 'row'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  image: {
    resizeMode: 'contain'
  }
})
