'use client'
import {Oaut} from '@/components/oaut/oaut';
import {OrderCard, OrdersList} from '@/components/orders-list/orders-list';
import {FIRE_BASE} from "@/constants/config";
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {ToolBar} from '@/components/toolbar/toolbar';
import {Button, ButtonGroup, chip, divider} from "@nextui-org/react";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {initializeApp} from "firebase/app";

const UserContext = createContext();

const User = () => {
    /*    const context = useContext(UserContext);*/

    return <div>
        <UserContext.Consumer>
            {(context) => (<span>This is user component: {context.name}</span>)}
        </UserContext.Consumer>
    </div>
}
const Order = () => {
    const context = useContext(UserContext);
    return <div>This is order component: {context.name}</div>
}
const SideBar = () => {
    return <div>This is sidebar: <User/></div>
}


const AuthProvider = createContext();
const Auth = () => {
    const {provider, auth} = useContext(AuthProvider);
    const signIn = () => {
        console.log('signIn');
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log('credential', credential);
                // The signed-in user info.
                const user = result.user;
                console.log('result', result);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('errorMessage', errorMessage);
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    return <div>
        <Button color='primary' onClick={signIn}>Войти</Button>
        Auth...
    </div>
}


const Consumer = (props) => {
    const {setTest, test} = useContext(UserContext);

    const change = () => {
        setTest('asdasasdasdasasdsasad')
    }

    return <div>
        <button onClick={change}>{`click me, because I will change this ==>`}{test}</button>
    </div>;
}

export default function Home() {

    const [newOrder, setNewOrder] = useState(null);

    const onOrderCreated = (createdOrder) => {
        console.log('Created order', createdOrder);
        setNewOrder(createdOrder);
    }

    const app = useMemo(() => {
        return initializeApp(FIRE_BASE);
    }, []);

    const provider = useMemo(() => {
        const provider = new GoogleAuthProvider();
        provider.addScope('email profile https://www.googleapis.com/auth/spreadsheets');
        return provider;
    }, [])

    const auth = useMemo(() => {
        return getAuth(app);
    }, [app])

    const [test, setTest] = useState('blabla')

    return (
        <>
            <UserContext.Provider value={{name: 'Bob', test, setTest}}>
                <Order/>
                <SideBar/>
                {test}
                <Consumer/>
            </UserContext.Provider>
            {/*            <AuthProvider.Provider value={{
                provider,
                auth
            }}>
                <Auth/>
            </AuthProvider.Provider>
            <Oaut newOrder={newOrder}>
                <OrdersList/>
            </Oaut>
            <ToolBar onOrderCreated={onOrderCreated}/>*/}
        </>
    )
}
