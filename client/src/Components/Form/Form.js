import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame } from "../../Actions";
import { getGenres } from "../../Actions";


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
    rating: 0,
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
    if(Object.values(formErrors).length > 0){
        alert("Please fill in all the required fields")
    } else{
        dispatch(createVideogame(input))
        alert("Videogame created successfully!")
    }
}

    return(
        <div>
            <h1>Fill in the fields</h1>

            <form onSubmit={submit}>
                <label>Title: </label>
                    <input type="text" value={input.name} name="name" onChange={handleSubmit}></input>
                    {formErrors.name && (<p>{formErrors.name}</p>)} 
                    <br/>

                    <label>Released: </label>
                    <input type="text" value={input.released} name="released" onChange={handleSubmit}></input>
                    {formErrors.released && (<p>{formErrors.released}</p>)} 
                    <br/>

                    <label>Rating: </label>
                    <input type="text" value={input.rating} name="rating" onChange={handleSubmit}></input>
                    {formErrors.rating && (<p>{formErrors.rating}</p>)}
                    <br/>

                    <label>Platforms: </label>
                    <input type="text" value={input.parent_platforms} name="parent_platforms" onChange={handleSubmit}></input>
                    {formErrors.parent_platforms && (<p>{formErrors.parent_platforms}</p>)}
                    <br/>

                    
                    <label>Description: </label>
                    <textarea value={input.description} name="description" onChange={handleSubmit} />
                    {formErrors.description && (<p>{formErrors.description}</p>)}
                    <br/>


        {/* //////////////////////////////CHECKBOXES FOR GENRES/////////////////////// */}
                    <div>
                    <h4>Genres: </h4>

                    <label> Action
                    <input 
                    type="checkbox"
                    value="Action"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    <br/>

                    <label> Indie
                    <input 
                    type="checkbox"
                    value="Indie"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    <br/>

                    <label> RPG
                    <input 
                    type="checkbox"
                    value="RPG"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    <br/>

                    <label> Adventure
                    <input 
                    type="checkbox"
                    value="Adventure"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    <br/>

                    <label> Shooter
                    <input 
                    type="checkbox"
                    value="Shooter"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    <br/>

                    <label> Casual
                    <input 
                    type="checkbox"
                    value="Casual"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    <br/>

                    <label> Strategy
                    <input 
                    type="checkbox"
                    value="Strategy"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    <br/>

                    <label> Simulation
                    <input 
                    type="checkbox"
                    value="Simulation"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>
                    <br/>

                    <label> Puzzle
                    <input 
                    type="checkbox"
                    value="Puzzle"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label> Platformer
                    <input 
                    type="checkbox"
                    value="Platformer"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label> Racing
                    <input 
                    type="checkbox"
                    value="Racing"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label> Massively Multiplayer
                    <input 
                    type="checkbox"
                    value="Massively Multiplayer"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label> Sports
                    <input 
                    type="checkbox"
                    value="Sports"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label> Fighting
                    <input 
                    type="checkbox"
                    value="Fighting"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label> Board Games
                    <input 
                    type="checkbox"
                    value="Board Games"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label> Educational
                    <input 
                    type="checkbox"
                    value="Educational"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    <label> Card
                    <input 
                    type="checkbox"
                    value="Card"
                    onChange={(e) => checkBoxes(e)}
                    />
                    </label>

                    </div>

                <button>Create Videogame</button>
            </form>
        </div>
    )
}

export default Form;