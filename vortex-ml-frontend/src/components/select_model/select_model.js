import React, { useState } from "react";
import './select_model.css'


export const SelectModel = () => {
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);

    };



    return (
        <div class="select-model">
            <h2 class="select-model-title">Select Model</h2>
            <div className="button-group">
                <button
                    className={`model-button ${selectedButton === 'AlexNet' ? 'selected' : ''}`}
                    onClick={() => handleButtonClick('AlexNet')}
                >
                    AlexNet
                </button>
                {/* The back end only serves AlexNet, so VGG-19 cannot be selected. */}
                <button
                    className="model-button"
                    disabled
                    title="VGG-19 is not available: the back end only serves AlexNet"
                >
                    VGG-19 (not available)
                </button>

            </div>

            <div class="model-info">
                <h3 class="model-info-title" >Model Info</h3>
                <p class="model-info-para" >AlexNet is a pioneering convolutional neural network (CNN) architecture that revolutionized the field of computer vision when it was introduced in 2012. Designed by Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton. With 60 million parameters and 650,000 neurons, AlexNet demonstrated the power of deep learning in image classification tasks.</p>
                <br></br>
                <p class="model-info-para" >Our version of AlexNet was trained over a dataset of CIFAR10 which contains the following 10 classes: Airplane,  Automobile (excluding trucks and pickup trucks), Bird, Cat, Deer, Dog, Frog, Horse, Ship, Truck (excluding pickup trucks)
                </p>
            </div>

        </div>
    );
};


export default SelectModel;