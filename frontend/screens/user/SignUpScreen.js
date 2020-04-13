/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import {View} from 'react-native';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {ApplicationProvider, Button, CheckBox, Input, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {ProfileAvatar} from './extra/profile-avatar.component';
// import { EmailIcon, EyeIcon, EyeOffIcon, FacebookIcon, GoogleIcon, PersonIcon, PlusIcon, TwitterIcon } from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';
import * as authActions from '../../store/actions/auth';

const SignUpScreen = ({navigation}) => {
  const [userName, setUserName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = () => {
    navigation.goBack();
  };

  const onSignInButtonPress = async () => {
    action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password,
    );
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Root');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const onPasswordIconPress = () => {
    // setPasswordVisible(!passwordVisible);
  };

  const renderPhotoButton = () => (
    <Button
      style={styles.editAvatarButton}
      size='small'
    // icon={PlusIcon}
    />
  );

  // FIXME: checkout box not working
  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require('./assets/image-background.jpg')}>
        <View style={styles.headerContainer}>
          <ProfileAvatar
            style={styles.profileAvatar}
            resizeMode='center'
            source={require('./assets/image-person.png')}
          // editButton={renderPhotoButton}
          />
        </View>
        <View style={styles.formContainer}>
          <Input
            status='control'
            autoCapitalize='none'
            placeholder='User Name'
            // icon={PersonIcon}
            value={userName}
            onChangeText={setUserName}
          />
          <Input
            style={styles.formInput}
            status='control'
            autoCapitalize='none'
            placeholder='Email'
            // icon={EmailIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.formInput}
            status='control'
            autoCapitalize='none'
            secureTextEntry={!passwordVisible}
            placeholder='Password'
            // icon={passwordVisible ? EyeIcon : EyeOffIcon}
            value={password}
            onChangeText={setPassword}
          // onIconPress={onPasswordIconPress}
          />
          {/* <CheckBox
            style={styles.termsCheckBox}
            textStyle={styles.termsCheckBoxText}
            text='I read and agree to Terms & Conditions'
            checked={termsAccepted}
            onChange={(checked) => setTermsAccepted(checked)}
          /> */}
        </View>
        <Button
          style={styles.signUpButton}
          size='giant'
          onPress={onSignUpButtonPress}>
          SIGN UP
        </Button>
        <View style={styles.socialAuthContainer}>
          <Text
            style={styles.socialAuthHintText}
            status='control'>
            Or Register Using Social Media
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance='ghost'
              size='giant'
              status='control'
            // icon={FacebookIcon}
            />
            <Button
              appearance='ghost'
              size='giant'
              status='control'
            // icon={GoogleIcon}
            />
            <Button
              appearance='ghost'
              size='giant'
              status='control'
            // icon={TwitterIcon}
            />
          </View>
        </View>
        <Button
          style={styles.signInButton}
          appearance='ghost'
          status='control'
          onPress={onSignInButtonPress}>
          Already have account? Sign In
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const App = ({navigation}) => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <SignUpScreen navigation={navigation} />
  </ApplicationProvider>
);

export default App;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 176,
  },
  profileAvatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignSelf: 'center',
    backgroundColor: 'background-basic-color-1',
    tintColor: 'text-hint-color',
  },
  editAvatarButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: 'text-control-color',
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  socialAuthContainer: {
    marginTop: 24,
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

