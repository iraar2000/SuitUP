import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authStyle } from '../assets/Styles/auth.styles';
import { Colors } from '../Constants/Colors';
import InputField from '../Components/inputField';
import { useEffect, useState } from 'react';
import { useSignIn } from '../hooks/useSignIn';
import { useNetworkConfig } from '../hooks/NetworkConfigProvider';

const signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {APIHOSTDB, APIHOSTIMG, NetworkConfig} = useNetworkConfig();
  const { signIn } = useSignIn()
  
  useEffect(()=>{
    console.log(email, password)
  },[email, password]);

  const onSignInClicked = () => {
    signIn(APIHOSTDB, email, password);
    router.replace("/main");
  }

  {/** TODO:
    *  1. Make the continue with ... buttons responsive
    *  2. link the database with the text fields
    *  3. create change password screen view 
    */}

  return (
    <>
      <View style={authStyle.Container}>
        <View style={authStyle.loginWrapper}>

          {/** This is the input form field of the login form */}
          <Text style={authStyle.loginTitle}>Welcome Back!</Text>
          <InputField
            placeholder='Enter Email'
            placeholderTextColor={Colors.Gray}
            value={email}
            onChangeText={(Text)=> (setEmail(Text))}
          />
          <InputField
            placeholder='Enter Password'
            placeholderTextColor={Colors.Gray}
            secureTextEntry={true}
            value={password}
            onChangeText={(Text)=>(setPassword(Text))}
          />

          {/** Login Button */}
          <TouchableOpacity style={authStyle.signinBtn} onPress={onSignInClicked}>
            <Text style={authStyle.signinBtnTxt}>Signin</Text>
          </TouchableOpacity>

          {/** This is the change password link router area */}
          <View style={authStyle.ContainerLink}>
            <Text style={authStyle.loginTxt}>Forgot your password?</Text>
            <Link href={"/signin"} asChild>
              <TouchableOpacity>
                <Text style={authStyle.loginTxtSpan}>Change Password!</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <View style={authStyle.Divider}/>

          {/** This is the continue buttons field area */}
          <View style={{alignSelf:"stretch", alignItems:'center'}}>
            <Text style={authStyle.loginSinupTxt}>You don't have an Account?</Text>
            <View style={authStyle.socialLoginWrapper}>
              <Link href={"/signup"} asChild>
                <TouchableOpacity style={authStyle.Button}>
                  <Ionicons name="mail-outline" size={20} color={Colors.Black}/>
                  <Text style={authStyle.ButtonText}>Continue with Email</Text>
                </TouchableOpacity>
              </Link>

              <TouchableOpacity style={authStyle.Button}>
                <Ionicons name="logo-google" size={20} color={Colors.Black}/>
                <Text style={authStyle.ButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={authStyle.Button}>
                <Ionicons name="logo-apple" size={20} color={Colors.Black}/>
                <Text style={authStyle.ButtonText}>Continue with Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </>
  )
}

export default signin