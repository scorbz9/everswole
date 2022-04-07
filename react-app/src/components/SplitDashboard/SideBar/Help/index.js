// React/Redux imports
import React, { useEffect, useRef } from "react";

// FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";



import './Help.css'

const Help = ({ showHelp, setShowHelp, toggleHelp }) => {

    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOutside = e => {

        if (showHelp && ref.current && !ref.current.contains(e.target)) {
                setShowHelp(false)
            }
        }

        document.addEventListener("click", checkIfClickedOutside)

        return () => {
        // Cleanup the event listener
        document.removeEventListener("click", checkIfClickedOutside)
        }
    }, [showHelp, setShowHelp])

    return (
        <>
            {showHelp ?
                <div className="overlay-wrapper">
                    <div className="help-container" ref={ref}>
                        <div className="help-information-container">
                            <div className="help-header">
                                How to Use Everswole
                            </div>
                            <FontAwesomeIcon icon={faXmark} onClick={toggleHelp} className="cancel-help"/>
                            <div className="help-information-section-header">
                                Days
                            </div>
                            <div className="help-information-day-info">
                                Everswole allows the user the create a workout day. A day is a
                                list of exercises that the user will perform on a given day. Users can assign
                                a dynamic amount of exercises on a day up to 9. A user can then go back to the
                                day (once they've performed the exercises) and make notes on how they performed
                                relative to their goals or anything else they'd like to remember about how an
                                exercise went for the future. Lastly, a user can delete a day when they no
                                longer need it.
                            </div>
                            <div className="help-information-section-header help-information-split-header">
                                Splits
                            </div>
                            <div className="help-information-split-info">
                                Everswole additionally allows the user to organize these workout days in a week-long
                                group called a split. A user can place the days they've created on any day of the week. They can
                                later update these splits if their plans change and they need to move when a workout takes place.
                                Additionally, a user can delete these splits if they no longer need them.
                            </div>
                        </div>
                    </div>
                </div>
            : <></> }
        </>
    )
}

export default Help;
