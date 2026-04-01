export type User = {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    image: string;
    address: {
      address: string;
      city: string;
      state: string;
      postalCode: string;
    };
    
  };