import { View, Text } from 'react-native'
import React from 'react'
import styles from '../StyleSheet'

export default function FeatureUnderDev() {
   return (
      <View style={styles.UnderDevContainer}>
         <Text style={styles.UnderDevText}>⚠ Feature under contruction!</Text>
      </View>
   )
}