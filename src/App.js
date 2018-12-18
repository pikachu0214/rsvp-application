import React, { Component } from 'react';
import './App.css';

//App components
import Header from "./Header";
import MainContent from "./MainContent";
class App extends Component {
  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: []
  };
  //initilize guest id
  lastGuestId = 0;
  //new ID method
  newGuestId = () => {
    const id = this.lastGuestId;
    this.lastGuestId += 1;
    return id;
  };

  //Method to check editing and confirmation component state
  toggleGuestPropertyAt = (property, id) => {
    this.setState({
      //maps through guests array
      guests: this.state.guests.map((guest) => {
        //if it matches
        if (id === guest.id) {
          return {
            ...guest, //returns all guest name
            [property]: !guest[property]
          };
        }
        return guest; //else return guest isConfirmed
      })
    });
  };

  //Toggles confirmed and unconfirmed
  toggleConfirmationAt = id =>
    this.toggleGuestPropertyAt("isConfirmed", id);

  //Method to edit name
  toggleEditingAt = id =>
    this.toggleGuestPropertyAt("isEditing", id);

  setNameAt = (name, id) => {
    this.setState({
      //maps through guests array
      guests: this.state.guests.map((guest) => {
        //if it matches
        if (id === guest.id) {
          return {
            ...guest, //returns all guest name
            name
          };
        }
        return guest; //else return guest isConfirmed
      })
    });
  };


  toggleFilter = () =>
    this.setState({isFiltered: !this.state.isFiltered});

  handleNameInput = e =>
    this.setState({pendingGuest: e.target.value});

  //Adds new guest
  newGuestSubmitHandler = e =>{
    e.preventDefault();
    const id = this.newGuestId();
    this.setState({ 
        guests: [
          {
            name: this.state.pendingGuest,
            isConfirmed: false,
            isEditing: false,
            id
          },
          ...this.state.guests
        ],
        pendingGuest: ""
      });
    };

  //Removes guest
  removeGuestAt = id =>
    this.setState({
      guests: this.state.guests.filter(guest => id !== guest.id)
    })
  
  //Total number of invited guests
  getTotalInvited = () => this.state.guests.length;

  //Total number of guests attending
  getAttendingGuests = () => 
  //accumulator is total, value is guest
   this.state.guests.reduce((total, guest) => guest.isConfirmed ? total + 1: total, 
   0); 
  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending; //Total number of guests not confirmed
    return (
      <div className="App">
        <Header  
          newGuestSubmitHandler={this.newGuestSubmitHandler}
          handleNameInput={this.handleNameInput}
          pendingGuest={this.state.pendingGuest}
        />
        <MainContent
          toggleFilter={this.toggleFilter}
          isFiltered={this.state.isFiltered}
          totalInvited={totalInvited} 
          numberAttending={numberAttending}
          numberUnconfirmed={numberUnconfirmed}  
          guests={this.state.guests}
          toggleConfirmationAt={this.toggleConfirmationAt}
          toggleEditingAt={this.toggleEditingAt}
          setNameAt={this.setNameAt}
          removeGuestAt={this.removeGuestAt}
          pendingGuest={this.state.pendingGuest}
          />
      </div>
    );
  }
}

export default App;
