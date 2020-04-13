/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';

import {Icon, IconElement} from '@ui-kitten/components';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {StyleSheet, View} from 'react-native';
import {
  ApplicationProvider,
  Input,
  Layout,
  Text,
  Button,
} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {
// EyeIcon,
// EyeOffIcon,
// FacebookIcon,
// GoogleIcon,
// PersonIcon,
  TwitterIcon,
} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';

import * as authActions from '../../store/actions/auth';
import {useDispatch} from 'react-redux';

// const AuthScreen = ({navigation}) => {
const AuthScreen = (props) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const dispatch = useDispatch();
  // TODO: make use of these
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();

  const onSignInButtonPress = async () => {
    // navigation.navigate('Root');
    const action = authActions.login(
        // todo: change input
        // email,
        // password,
        'william.li@gmail.com',
        'password123',
    );
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(action);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const onSignUpButtonPress = () => {
    props.navigation.navigate('SignUp');
  };

  const onForgotPasswordButtonPress = () => {
    // navigation.navigate('ForgotPassword');
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require('./assets/image-background.jpg')}>
        <View style={styles.headerContainer}>
          <Text
            category='h1'
            status='control'>
            Welcome to Dining Daddy
          </Text>
          <Text
            style={styles.signInLabel}
            category='s1'
            status='control'>
            Sign in to your account
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            status='control'
            placeholder='Email'
            // icon={PersonIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.passwordInput}
            status='control'
            placeholder='Password'
            // icon={passwordVisible ? EyeIcon : EyeOffIcon}
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
          // onIconPress={onPasswordIconPress}
          />
          <View style={styles.forgotPasswordContainer}>
            <Button
              style={styles.forgotPasswordButton}
              appearance='ghost'
              status='control'
              onPress={onForgotPasswordButtonPress}>
              Forgot your password?
            </Button>
          </View>
        </View>
        <Button
          style={styles.signInButton}
          size='giant'
          onPress={onSignInButtonPress}>
          SIGN IN
        </Button>
        <View style={styles.socialAuthContainer}>
          <Text
            style={styles.socialAuthHintText}
            status='control'>
            Or Sign In using Social Media
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance='ghost'
              status='control'
              size='giant'
            // icon={GoogleIcon}
            />
            <Button
              appearance='ghost'
              status='control'
              size='giant'
            // icon={FacebookIcon}
            />
            <Button
              appearance='ghost'
              status='control'
              size='giant'
              // FIXME: fix icon
              // icon={TwitterIcon}
            />
          </View>
        </View>
        <Button
          style={styles.signUpButton}
          appearance='ghost'
          status='control'
          onPress={onSignUpButtonPress}>
          Dont have an account? Sign Up
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};


const App = ({navigation}) => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <AuthScreen navigation={navigation} />
  </ApplicationProvider>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginVertical: 12,
  },
  socialAuthContainer: {
    marginTop: 32,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});

