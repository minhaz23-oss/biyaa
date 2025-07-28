
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  activeTab: string;           
  sidebarOpen: boolean;       
  isBiodataExists: boolean;   
  userProfile: {              
    name: string;
    email: string;
    profilePicture?: string;   
  };
  favorites: string[];         // Array of biodata IDs
}


const initialState: UserState = {
  activeTab: 'dashboard',      
  sidebarOpen: true,          
  isBiodataExists: false,     
  userProfile: {
    name: '',                 
    email: '',                
  },
  favorites: [],               // Initialize empty favorites array
};

const userSlice = createSlice({
  name: 'user',              
  initialState,              
  reducers: {                
    
    
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    
    
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;  
    },
    
    
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    
  
    setUserProfile: (state, action: PayloadAction<Partial<UserState['userProfile']>>) => {
      state.userProfile = { ...state.userProfile, ...action.payload };
    },
    
    setBiodataExists: (state, action: PayloadAction<boolean>) => {
      state.isBiodataExists = action.payload;
    },
    
    // Favorites management
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
  },
});

export const { 
  setActiveTab, 
  toggleSidebar, 
  setSidebarOpen, 
  setUserProfile, 
  setBiodataExists,
  addToFavorites,
  removeFromFavorites,
  setFavorites
} = userSlice.actions;


export default userSlice.reducer;