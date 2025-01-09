import React, {Component, useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {publicRoutes} from "../routes";
import {ALLRECIPES_ROUTE, MAIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
//import Main from '../pages/main/Main';

const AppRouter = observer(() => {
    //const {user} = useContext(Context)
    //console.log(user)
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component} exact/>
            )}
            <Route
                path="*"
                element={<Navigate to={MAIN_ROUTE} replace />}
            />
        </Routes>
    );
});

export default AppRouter;