import './CategorySelector.css'

interface CategoryProps {
    category: string;
    onCategorySet: (event: React.ChangeEvent<HTMLSelectElement>)=>void
}

const CategorySelector = ({category, onCategorySet}:CategoryProps) =>{
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>)=>{
        onCategorySet(event);
    }
return (<div className=" py-2 flex flex-col">
    <label htmlFor="category" className="block text-sm/6 font-small input-label">Category</label>
            <select value={category} onChange={handleSelect} name="category" id="category" className = "block min-w-0 grow p-1  focus:outline-none input-field">
            <optgroup label="housing">
                <option value="rent">Rent/Mortgage</option>
                <option value="utilities">Utilities (Electricity, Water, Gas)</option>
                <option value="phone">Internet/Phone</option>
                <option value="maintenance">Maintenance</option>
            </optgroup>
            <optgroup label="transportation">
                <option value="fuel">Fuel</option>
                <option value="public-transport">Public Transport</option>
                <option value="car-payment">Car Payment/Insurance</option>
                <option value="repairs">Repairs/Maintenance</option>
            </optgroup>
            <optgroup label="food">
                <option value="groceries">Groceries</option>
                <option value="dining-out">Dining Out</option>
                <option value="coffee">Coffee/Drinks</option>
            </optgroup>
            <optgroup label="health">
                <option value="medical">Medical Bills</option>
                <option value="insurance">Insurance (Health, Dental, Vision)</option>
                <option value="fitness">Fitness (Gym Membership, Equipment)</option>
            </optgroup>
            <optgroup label="entertainment">
                <option value="movies">Movies/Streaming Services</option>
                <option value="events">Concerts/Events</option>
                <option value="hobbies">Hobbies</option>
            </optgroup>
            <optgroup label="personalcare">
                <option value="haircuts">Haircuts/Salons</option>
                <option value="skincare">Skincare/Beauty Products</option>
            </optgroup>
            <optgroup label="education">
                <option value="books">Books</option>
                <option value="courses">Courses/Classes</option>
                <option value="supplies">School Supplies</option>
            </optgroup>
            <optgroup label="shopping">
                <option value="clothing">Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="home-decor">Home Decor</option>
            </optgroup>
            <optgroup label="debt">
                <option value="credit-card">Credit Card Payments</option>
                <option value="loans">Loan Repayments</option>
            </optgroup>
            <optgroup label="gifts">
                <option value="family">Gifts for Friends/Family</option>
                <option value="charity">Charitable Contributions</option>
            </optgroup>
            <optgroup label="travel">
                <option value="vacations">Travel/Vacations</option>
                <option value="tickets">Tickets (Flights, Trains)</option>
            </optgroup>
            <optgroup label="miscellaneous">
                <option value="subscriptions">Subscriptions (Software, Apps)</option>
                <option value="pet-care">Pet Care</option>
                <option value="other">Other</option>
            </optgroup>

            </select>
</div>)
}

export default CategorySelector;