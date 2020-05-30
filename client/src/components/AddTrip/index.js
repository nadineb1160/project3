import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import { useUserContext } from "../../state/UserContext";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


function tripJSON(trip, description, startDate, endDate, cityId) {
    return (
        {
            "tripName": trip,
            "description": description,
            "startDate": startDate,
            "endDate": endDate,
            "CityId": cityId
        }
    )
}

function AddTrip({ cityId }) {
    const [tripName, setTripName] = useState("");
    const [description, setDescription] = useState("");
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    // const [note, setNote] = useState("");
    const { user } = useUserContext();
    const history = useHistory();

    const handleAdd = (event) => {
        event.preventDefault();

        console.log(state[0])

        // Format: Day of week | Month | Day | Year
        let startDate = state[0].startDate.toString().split(" ").slice(0, 4).join(" ");
        let endDate = state[0].endDate.toString().split(" ").slice(0, 4).join(" ");

        console.log(startDate)
        console.log(endDate)

        const tripBody = tripJSON(tripName, description, startDate, endDate, cityId);
        console.log(tripBody)


        API.saveTrip(tripBody)
            .then(() => {
                console.log("Saved Trip")
                return (
                    history.push(`/city/${cityId}/trip`),
                    window.location.reload()
                )
            })
            .catch(error => {
                console.log(error)
            })

    }

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "tripName") {
            setTripName(value);
        } else if (name === "description") {
            setDescription(value);
        }
    };

    return (
        <div>

            <div className="flex justify-center m-6">
                <form className="w-full max-w-sm bg-teal-600 bg-opacity-75 p-3 rounded">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label className="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="tripName">
                                Trip
                            </label>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-full">
                            <input
                                type="text"
                                className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                                name="tripName"
                                value={tripName}
                                placeholder="Road Trip Summer 2014"
                                id="tripName"
                                onChange={(event) => onChangeHandler(event)} />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="w-1/4">
                            <label className="block text-white font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="tripName">
                                Description
                            </label>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-full">
                            <input
                                type="text"
                                className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                                name="description"
                                value={description}
                                placeholder="Adventure around Eastern Europe with cousin Stef and Mom after interning in Berlin."
                                id="description"
                                onChange={(event) => onChangeHandler(event)} />
                        </div>
                    </div>
                    <div className="flex items-center mb-6 justify-center">
                        <DateRange
                            name="date"
                            editableDateInputs={true}
                            onChange={item => setState([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                            color={"#319795"}
                            rangeColors={["#319795", "#319795", "#319795"]}
                            id="date"
                        />
                    </div>

                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                            <button onClick={event => handleAdd(event)} className="shadow bg-white focus:shadow-outline focus:outline-none text-teal-600 font-bold py-2 px-4 rounded" type="button">
                                Add +
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTrip;
