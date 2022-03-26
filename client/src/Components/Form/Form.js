import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame } from "../../Actions";
import { getGenres } from "../../Actions";


import "../Form/Form.css"

function formValidation(input){
    let formErrors = {};

    if(!input.name){
        formErrors.name = "Title is required";
    }
    if(!input.description){
        formErrors.description = "Description is required";
    }
    if(!input.parent_platforms){
        formErrors.parent_platforms = "Platforms are required";
    }
    if(input.rating < 0 || input.rating > 5){
        formErrors.rating = "Rating must be between 1 and 5";
    }
    if(!input.genres){
        formErrors.genres = "Please include at least one genre";
    }

    return formErrors;
};




export function Form(){
const dispatch = useDispatch();
const allGenres = useSelector(state => state.diets)
const [formErrors, setFormErrors] = useState({})


const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    parent_platforms: [],
    rating: "",
    genres: [],
    background_image: ""
})

useEffect(() => {
    dispatch(getGenres())
}, [])

function handleSubmit(e){
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
    setFormErrors(formValidation({
        ...input,
        [e.target.name]: e.target.value
    }))
}

function checkBoxes(e){
    if(e.target.checked){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }
}

function submit(e){
    e.preventDefault()
    if(Object.values(formErrors).length > 0 || input.name === ""){
        alert("Please fill in all the required fields")
    } else{
        dispatch(createVideogame(input))
        alert("Videogame created successfully!")
    }
}

    return(
        <div className="form"> 
                <h1 className="form-title">Fill in the fields</h1>
                <button>CREATE!</button>

                <div className="inputs_checkboxes">
            <form onSubmit={submit}>

                <div className="inputs">
                <label>Title: </label>
                    <input className="input-name" type="text" value={input.name} name="name" onChange={handleSubmit}></input>
                    {formErrors.name && (<p className="warning">{formErrors.name}</p>)} 
                    <br/>

                    <label>Released: </label>
                    <input  className="input-name" type="text" value={input.released} name="released" onChange={handleSubmit}></input>
                    {formErrors.released && (<p className="warning">{formErrors.released}</p>)} 
                    <br/>

                    <label>Rating: </label>
                    <input className="input-name" type="number" value={input.rating} name="rating" onChange={handleSubmit}></input>
                    {formErrors.rating && (<p className="warning">{formErrors.rating}</p>)}
                    <br/>

                    <label>Platforms: </label>
                    <input  className="input-name" type="text" value={input.parent_platforms} name="parent_platforms" onChange={handleSubmit}></input>
                    {formErrors.parent_platforms && (<p className="warning">{formErrors.parent_platforms}</p>)}
                    <br/>

                    
                    <label>Description: </label>
                    <textarea className="textarea-name" value={input.description} name="description" onChange={handleSubmit} />
                    {formErrors.description && (<p className="warning">{formErrors.description}</p>)}
                    <br/>
                    </div>

        {/* //////////////////////////////CHECKBOXES FOR GENRES/////////////////////// */}
                    <div className="checkboxes">
                    <h4>Genres: </h4>

                    <label className="form_boxes"> Action
                    <input 
                    type="checkbox"
                    value="Action"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    

                    <label className="form_boxes"> Indie
                    <input 
                    type="checkbox"
                    value="Indie"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    

                    <label className="form_boxes"> RPG
                    <input 
                    type="checkbox"
                    value="RPG"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    

                    <label className="form_boxes"> Adventure
                    <input 
                    type="checkbox"
                    value="Adventure"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    

                    <label className="form_boxes"> Shooter
                    <input 
                    type="checkbox"
                    value="Shooter"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    

                    <label className="form_boxes"> Casual
                    <input 
                    type="checkbox"
                    value="Casual"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    

                    <label className="form_boxes"> Strategy
                    <input 
                    type="checkbox"
                    value="Strategy"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    

                    <label className="form_boxes"> Simulation
                    <input 
                    type="checkbox"
                    value="Simulation"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    

                    <label className="form_boxes"> Puzzle
                    <input 
                    type="checkbox"
                    value="Puzzle"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label className="form_boxes"> Platformer
                    <input 
                    type="checkbox"
                    value="Platformer"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label className="form_boxes"> Racing
                    <input 
                    type="checkbox"
                    value="Racing"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label className="form_boxes"> Massively Multiplayer
                    <input 
                    type="checkbox"
                    value="Massively Multiplayer"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label className="form_boxes"> Sports
                    <input 
                    type="checkbox"
                    value="Sports"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label className="form_boxes"> Fighting
                    <input 
                    type="checkbox"
                    value="Fighting"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label className="form_boxes"> Board Games
                    <input 
                    type="checkbox"
                    value="Board Games"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label className="form_boxes"> Educational
                    <input 
                    type="checkbox"
                    value="Educational"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label className="form_boxes"> Card
                    <input 
                    type="checkbox"
                    value="Card"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    </div>

            </form>
            </div>
        </div>
    )
}

export default Form;