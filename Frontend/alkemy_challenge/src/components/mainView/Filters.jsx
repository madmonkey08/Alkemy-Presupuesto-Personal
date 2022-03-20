import React, { useRef, useEffect } from 'react';

export const Filters = ({ setFilter, budgetFlag }) => {

    const category = useRef("All");

    useEffect(() => {
        category.current.value = "All";
    }, [budgetFlag]);

    return (
        <div className="flex flex-col w-fit pl-10">
            <label className="ABMLabel" htmlFor="category">Category:</label>
            <select name="category" ref={category} className={`ABMInput`} onChange={() => setFilter(category.current.value)} >
                <option value="All">All</option>
                <option value="Salary">Salary</option>
                <option value="Bonus">Bonus</option>
                <option value="Extras">Extras</option>
                <option value="Other">Other</option>
                <option value="Food">Food</option>
                <option value="Entertainment">Entertainment</option>
                <option value="House">House</option>
                <option value="Services">Services</option>
                <option value="Education">Education</option>
                <option value="Transport">Transport</option>
                <option value="Health">Health</option>
                <option value="Taxes">Taxes</option>
                <option value="Other">Other</option>
            </select>
        </div>
    );
}
