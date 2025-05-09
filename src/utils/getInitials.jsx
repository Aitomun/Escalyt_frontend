export const getInitials = (firstName, lastName) => {
    const initials = (firstName[0] || '') + (lastName[0] || '');
    return initials.toUpperCase();
  };
  
  export const fetchUserData = async () => {
    // Mock fetching user data. Replace this with actual API call.
    return {
      firstName: 'John',
      lastName: 'Doe'
    };
  };
  