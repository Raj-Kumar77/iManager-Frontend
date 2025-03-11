import React, { createContext, useContext, useState } from 'react'

export const AppContext = createContext()

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
  };

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [selectedPlan, setSelectedPlan] = useState({
      subscriptionType: 'Pro',
      subscriptionPrice: '10'
    })


    const value = {selectedPlan, setSelectedPlan, backendUrl}
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
