const initalState = [
  {
    id: 0,
    name: 'conghau',
    email:'conghau@gmai.com',
    number: 12345,

  },
  {
    id: 1,
    name: 'nam',
    email:'nam@gmail.com',
    number: 1234567890,
  },
];
const contactReducer = (state = initalState, action) => {
    switch (action.type){
      case 'ADD_CONTACT':
        state = [...state, action.payload];
        return state;
      case 'UPDATE_CONTACT':
        const updateState = state.map(contact => contact.id === action.payload.id ? action.payload : contact);
        state = updateState;
        return state

      case "DELETE_CONTACT":
        const filterContacts = state.filter(contact => contact.id !== action.payload && contact);
        state = filterContacts;
        return state;

        default: return state;
    }
};
export default contactReducer;