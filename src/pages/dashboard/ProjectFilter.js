
const allFilters = ["all", "mine", "development", "design", "sales", "marketing"]

export default function ProjectFilter({ currentFilter, changeFilter }) {


    // console.log(currentFilter)

    return (
        <div className="project-filters">
            <nav>
                <p>Filter by:</p>
                {allFilters.map(f => (
                    <button key={f} onClick={() => changeFilter(f)} className={(currentFilter === f) ? 'active' : ''}>
                        {f}
                    </button>
                ))}
            </nav>
        </div>
    );
}
