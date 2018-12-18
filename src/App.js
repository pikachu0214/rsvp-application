import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';
import Counter from "./Counter";
import Header from "./Header";
import MainContent from "./MainContent";
class App extends Component {
  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [
      { name: "Treasure", isConfirmed: false, isEditing: false },
      { name: "Nic", isConfirmed: false, isEditing: false },
      { name: "Matt K", isConfirmed: false, isEditing: true }
    ]
  };

  //checks editing and confirmation
  toggleGuestPropertyAt = (property, indexToChange) => {
    this.setState({
      //maps through guests array
      guests: this.state.guests.map((guest, index) => {
        //if it matches
        if (index === indexToChange) {
          return {
            ...guest, //returns all guest name
            [property]: !guest[property]
          };
        }
        return guest; //else return guest isConfirmed
      })
    });
  };

  //checks checkbox confirmation
  toggleConfirmationAt = index =>
    this.toggleGuestPropertyAt("isConfirmed", index);

  //checks checkbox confirmation
  toggleEditingAt = index =>
    this.toggleGuestPropertyAt("isEditing", index);

  setNameAt = (name, indexToChange) => {
    this.setState({
      //maps through guests array
      guests: this.state.guests.map((guest, index) => {
        //if it matches
        if (index === indexToChange) {
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

  newGuestSubmitHandler = e =>{
    e.preventDefault();
   this.setState({ 
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.guests
      ],
      pendingGuest: ""
    });
  };

  removeGuestAt = index =>
    this.setState({
      guests: [
        ...this.state.guests.slice(0, index),
        ...this.state.guests.slice(index + 1)
      ]
    })
  
  getTotalInvited = () => this.state.guests.length;

  getAttendingGuests = () => 
  //accumulator is total, value is guest
   this.state.guests.reduce((total, guest) => guest.isConfirmed ? total + 1: total, 
   0); 
  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    return (
      <div className="App">
        <Header  
          newGuestSubmitHandler={this.newGuestSubmitHandler}
          handleNameInput={this.handleNameInput}
          pendingGuest={this.state.pendingGuest}
        />
        <div className="main">
          <MainContent
            isFiltered={this.state.isFiltered}
            toggleFilter={this.toggleFilter}
          />
          <Counter 
          totalInvited={totalInvited} 
          numberAttending={numberAttending}
          numberUnconfirmed={numberUnconfirmed}  
          />
          <GuestList
            guests={this.state.guests}
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingAt}
            setNameAt={this.setNameAt}
            isFiltered={this.state.isFiltered}
            removeGuestAt={this.removeGuestAt}
            pendingGuest={this.state.pendingGuest}
          />
        </div>
      </div>
    );
  }
}

export default App;
