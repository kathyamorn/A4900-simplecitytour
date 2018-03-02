


// keson: how to guarantee confirm password are the same one

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text,
		 View, 
		 StyleSheet,
		 Button,
		 TextInput,
		 Image,
		 Dimensions,
		 ListView} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

export default class CreateAccount extends Component {
	constructor(props) {
		super(props);
    	this.state = { 
			fname: "First45",
			lname: "Last",
			email: "@email.com",
			password: "Password",
			confirm: "Confirm Password",
			hidePass: false,
			textColor: "gray",
			screenwidth: Dimensions.get('window').width
		};

		this.sign_up = this.sign_up.bind(this);

	};
	  
	

	static navigationOptions = {
		title: 'Sign Up',
	};
	

	sign_up() {
		url = "http://192.168.1.79:8000/api/signup/";
		data = {"username":this.state.lname+this.state.fname,"password":this.state.password,"email":this.state.email};
		console.log(JSON.stringify(data)); 	  
		fetch(url, {
		  headers: {'Content-Type': 'application/json',},
		  body: JSON.stringify(data),
		  method: 'POST',
		}).then((response) => {

			if (JSON.parse(response._bodyText)["failed"] === "username existed"){
				alert("This username alread exists.")
			}

			if (JSON.parse(response._bodyText)["succeed"] === "created"){
				alert("Successfully Signup.")
			}

			// console.log(JSON.parse(response._bodyText));
			// if (response.data["token"]):
			// 	token = response.data["token"]
			// 	console.log(token)
			// navigate('Locations');
			return
		}, (err) => { 
			console.error(err)
		});
	}

	_setPassword(password){
		this.state.textColor="black";
		this.setState({password});
		this.state.hidePass = true;
	}

	_showPassword(){
		this.state.hidePass = false;
		this.setState(this.state);
	}

	_hidePassword(){
		this.state.hidePass = true;
		this.setState(this.state);
	}	

	render() {
		const {navigate} = this.props.navigation;
		return (
			<View style={styles.container}>
			 <Image  style={{
        		  flex: 1,
        		  position: "absolute"
        		}}source={require('../pictures/hiking.jpg')}> 	
				
			</Image>



				<View style={styles.container}>
					<Text>Create an Account</Text>

					<View style={{flexDirection:"row",}}>
					<Icon style={styles.searchIcon} name="user" size={30} color="white" />
						<View style={{flex:1,}}>
							<TextInput
					        	style={{
									  justifyContent: 'flex-start', backgroundColor: "white", textAlign: "left", paddingLeft: 20, margin: 20,
									}}
					        	onChangeText={(fname) => this.setState({fname})}
					        	value={this.state.fname}
					        	selectTextOnFocus={true}
					      	/>
				      	</View>
				      	<View style={{flex:1}}>
							<TextInput
					        	style={{justifyContent: 'flex-end', backgroundColor: "white", textAlign: "left", paddingLeft: 20, margin: 20,
					        }}
					        	onChangeText={(lname) => this.setState({lname})}
					        	value={this.state.lname}
					        	selectTextOnFocus={true}
					      	/>
				      	</View>
			      	</View>

			    <View style={{flexDirection:"row",}}>
			    	<Icon style={styles.searchIcon} name="envelope" size={23} color="white" />
			      	<View style={{flex:1}}>
						<TextInput
				        	style={styles.textbox}
				        	onChangeText={(email) => this.setState({email})}
				        	value={this.state.email}
				        	selectTextOnFocus={true}
				      	/>
			      	</View>
		      	</View>

		      	<View style={{flexDirection:"row",}}>
		      		<Icon style={styles.searchIcon} name="lock" size={35} color="white" />
			      	<View style={{flex:1}}>
					<TextInput
			        	style={styles.textboxpass}
			        	onChangeText={(password) => {this._setPassword(password);}}
			        	value={this.state.password}
			        	selectTextOnFocus={true}
			        	secureTextEntry = {this.state.hidePass}
			      	/>
			      	</View>
		      	</View>

		      	<View style={{flexDirection:"row",}}>
		      		<Icon style={styles.searchIcon} name="lock" size={35} color="white" />
			      	<View style={{flex:1}}>
					<TextInput
			        	style={styles.textboxpass}
			        	onChangeText={(confirm) => this.setState({confirm})}
			        	value={this.state.confirm}
			        	selectTextOnFocus={true}
			        	secureTextEntry = {this.state.hidePass}
			      	/>
			      	</View>		
		      	</View>

		      	<View style={{margin: 20}}>
					<Icon.Button name="eye"  disabled={!this.state.hidePass} backgroundColor="#3b5998" onPressIn={() => {this._showPassword()}} onPressOut={() => {this._hidePassword()}}>
						Show Password
					</Icon.Button> 
				</View>

				<View style={{margin: 20}}>
				<Icon.Button name="user-plus" backgroundColor="#00ff66" onPress={() =>{this.sign_up()}}>
					Create
				</Icon.Button> 
				</View>

		      	</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },	

  textbox:{
  	height: 30,
  	backgroundColor: "white",
  	textAlign: "right",
  	paddingRight: 20,
  	margin: 20,
  	color: "gray"
  },

  textboxpass:{
  	height: 30,
  	backgroundColor: "white",
  	textAlign: "left",
  	paddingLeft: 20,
  	margin: 20, 
  	color: "gray"
  },  

searchIcon: {
    padding: 10,
    marginTop: 10,
},
});