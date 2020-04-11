import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import FormField from "../../ui/FormFields";
import {validate} from '../../ui/misc';

import {firebasePlayers, firebaseDB , firebase } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';
import Fileuploader from '../../ui/FileUploader';


class AddEditPlayers extends Component {

    state = {
        playerId : '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formData:{
            name:{
                element:'input',
                value:'',
                config:{
                    name:'name_input',
                    type:'text',
                    label: 'Player Name'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
            lastname:{
                element:'input',
                value:'',
                config:{
                    name:'lastname_input',
                    type:'text',
                    label: 'Player Last Name'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
            number:{
                element:'input',
                value:'',
                config:{
                    name:'number_input',
                    type:'text',
                    label: 'Player Number'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
            position:{
                element:'select',
                value:'',
                config:{
                    name:'position_select',
                    type:'select',
                    label: 'Select a Position',
                    options: [
                        {key: "Keeper", value: "Keeper"},
                        {key: "Defence", value: "Defence"},
                        {key: "Midfield", value: "Midfield"},
                        {key: "Striker", value: "Striker"}
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
            image: {
                element: 'image',
                value:'',
                validation:{
                    required: true
                },
                valid: false
            }
        }

    }

    updateFields = (player, playerId, type, defaultImg) => {
        const newFormData = {...this.state.formData}

        for(let key in newFormData){
            newFormData[key].value = player[key]
            newFormData[key].valid = true;
        }

        this.setState({
            playerId,
            defaultImg,
            formType: type,
            formData : newFormData
        })
    }

    componentDidMount(){
        const playerId = this.props.match.params.id;
        if(!playerId){
            this.setState({
                formType: 'Add Player'
            })
        }else{
            firebaseDB.ref(`players/${playerId}`).once('value')
            .then((snapshot)=>{
                const playerData = snapshot.val();
                firebase.storage().ref('players')
                .child(playerData.image).getDownloadURL()
                .then(url => {
                    this.updateFields(playerData, playerId, 'Edit Player', url)
                }).catch( e => {
                    this.updateFields({
                        ...playerData,
                        image: ''
                    }, playerId, 'Edit Players', '')
                })
            })
            
        }

    }


    updateForm(element, content=''){
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[element.id]}

        if(content === ''){
            newElement.value = element.event.target.value;
        }else{
            newElement.value = content
        }
        
        let valiData = validate(newElement);
        newElement.valid = valiData[0];
        newElement.validationMessage = valiData[1];

        newFormData[element.id] = newElement;

        this.setState({
            formError: false,
            formData: newFormData
        })
    }

    successForm = ( message ) => {
        this.setState({
            formSuccess: message
        })
        setTimeout(()=>{
            this.setState({
                formSuccess:''
            })
        }, 2000)
    }

    submitForm(event){
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        

        if(formIsValid){
            console.log(dataToSubmit);
            if(this.state.formType === 'Edit Player'){
                firebaseDB.ref(`players/${this.state.playerId}`)
                .update(dataToSubmit).then(()=>{
                    this.successForm('Updated correctly')
                }).catch( e => {
                    this.setState({formError: true})
                })
            }else{
                firebasePlayers.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_players')
                }).catch((e)=>{
                    this.setState({
                        formError: true
                    })
                })
            }
        }else{
            this.setState({
                formError: true
            })
        }
    }

    resetImage(){
        const newFormData = {...this.state.formData}
        newFormData['image'].value = '';
        newFormData['image'].valid= false;
        this.setState({
            defaultImg: '',
            formData: newFormData
        })
    }

    storeFilename(filename){
        this.updateForm({id:'image'}, filename)
    }

    render() {
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>{this.state.formType}</h2>
                    <div>
                        <form onSubmit={(event)=> this.submitForm(event)}>
                            <Fileuploader
                                dir="players"
                                tag={"Player image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formData.image.value}
                                resetImage={()=>this.resetImage()}
                                filename={(filename)=>this.storeFilename(filename)}
                            />

                            <FormField 
                                id={'name'}
                                formData = {this.state.formData.name}
                                change={(element)=>this.updateForm(element)}
                            />
                            <FormField 
                                id={'lastname'}
                                formData = {this.state.formData.lastname}
                                change={(element)=>this.updateForm(element)}
                            />
                            <FormField 
                                id={'number'}
                                formData = {this.state.formData.number}
                                change={(element)=>this.updateForm(element)}
                            />
                            <FormField 
                                id={'position'}
                                formData = {this.state.formData.position}
                                change={(element)=>this.updateForm(element)}
                            />

                            <div className="success_label">{this.state.formSuccess}</div>
                            {this.state.formError ? 
                            <div className="error_label">
                                Something is wrong
                            </div>
                            :null}
                            <div className="admin_submit">
                                <button onClick={(event)=>this.submitForm(event)}>
                                    {this.state.formType}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AddEditPlayers;