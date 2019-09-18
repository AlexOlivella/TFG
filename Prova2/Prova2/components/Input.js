import React, { Component } from 'react';
import { TextInput } from 'react-native';

export default function UselessTextInput() {
  const [value, onChange] = React.useState("Username");

  return (
    <TextInput
      style={{ 
          height: 40,  
          alignItems: 'stretch', 
          borderColor: 'gray', 
          borderWidth: 1 }}
      //onChange={text => onChange(text)}
      defaultValue="Username"
    />
  );
}
