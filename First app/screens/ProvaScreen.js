import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
       
      
       
      <ExpoLinksView />
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  //Aqui va el titol de la pantalla 
  title: 'Pantalla de prova',
   
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  titol:{
    backgroundColor: '#dc143c',
  },
});
