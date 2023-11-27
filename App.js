import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { createHash } from './utils/encryption';
import { randomDNIGenerator } from './utils/dni';

/**
 * 
 * @returns 
 * 
 * todo: 
 *  - get requests access token which updates every 2 or 3 days -> accessToken: 80170a5c-65bb-11ee-b55e-02dc4692d6fc
 *  - Pass request through vpn to maximize privacy 
 */
export default function App() {
  const [ dni, setDni ] = useState('');
  const [ bikeNumber, setBikeNumber ] = useState('');
  const [ hash, setHash ] = useState('');
  const [ success, setSuccess ] = useState(false);
  const [ apiResponse, setApiResponse ] = useState({});
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    setHash(generateHash(dni, bikeNumber));
  }, [dni, bikeNumber])
  const requestOptions = {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'hashcode': hash,
      'accessToken': accessToken
    },
  };

  function generateHash() {
    return createHash(dni, bikeNumber);
  }
  const url = 'your.api.url';
  
  function generateRandomDNI() {
    setDni(randomDNIGenerator());
  }


  async function submitQuery () {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log('data', data);
    setApiResponse(data);
  }
  
 
  return (
    <View style={styles.container}>
      <Text>BiciJajasParaTodz {generateHash}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDni}
        value={dni}
        placeholder="dni"
      />
      <Button 
        title="Generar DNI aleatorio"
        onPress={generateRandomDNI}
      />
      <TextInput
        style={styles.input}
        onChangeText={setBikeNumber}
        value={bikeNumber}
        placeholder="bike number"
        keyboardType="numeric"
        
      />
      <Button 
        title="Liberar bixiclencha"
        onPress={submitQuery}
      />

    <Text>Response: </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
