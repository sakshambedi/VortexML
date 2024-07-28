/* 
* This is the main body of the website
*/

import React from "react";
import './body.css'
import UploadButton from "./buttons/upload-button.js";
import SelectModel from "./select_model/select_model.js"


export const Body = () => {
    return (
        <div class="body-main">
            <div class="begin">
                <h2 class="body-title">Model Playground</h2>
                <p>Test one of models for Classification Problems.</p>
            </div>
            <div class="select-model-section">
                <SelectModel />
            </div>

            <div class="upload-image-section">

                <UploadButton />
            </div>

          
        </div >


    );
};


export default Body;

