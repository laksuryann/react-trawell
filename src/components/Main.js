import React, { useState, useEffect } from "react"
import axios from 'axios'

function Main() {

    const [url] = useState('https://agidmc.com/singapore.json')
    const [Data, setData] = useState([])
    const [FilteredData, setFilteredData] = useState([])
    const [OpenedItem, setOpenedItem] = useState('')

    useEffect(() => {
        axios.get(url)
            .then(res => {
                let data = res.data
                setFilteredData(data && data.data)
                setData(data && data.data)
            })
            .catch(error => console.error(error))
    }, [url])

    const selectHandler = (e) => {
        switch (e.target.value) {
            case 'alphabet':
                setFilteredData([...Data.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))])
                break;
            case 'price-low':
                setFilteredData([...Data.sort((a, b) => a.fromPrice - b.fromPrice)])
                break;
            case 'price-high':
                setFilteredData([...Data.sort((a, b) => b.fromPrice - a.fromPrice)])
                break;
            default:
                break;
        }
    }

    return (
        <>
            <select className="form-select m-2" style={{ width: '40%' }} onChange={(e) => selectHandler(e)}>
                <option selected>Sort by</option>
                <option value="alphabet">Alphabet</option>
                <option value="price-low">Price - Low to high</option>
                <option value="price-high">Price - High to Low</option>
            </select>
            <div>
                {FilteredData && FilteredData.map((detail) => {
                    return (
                        <div key={detail.id} className="accordion-item m-2 rounded">
                            <h5 className="accordion-header" id="flush-headingOne" onClick={() => detail.id === OpenedItem ? setOpenedItem('') : setOpenedItem(detail.id)}>
                                <button className={OpenedItem === detail.id ? 'accordion-button' : 'accordion-button collapsed'} type="button">
                                    <div className="d-flex align-items-center">
                                        <h5>{detail.title}</h5>
                                        {detail.category.map(i => <div key={i} className="badge bg-info text-dark m-1">{i}</div>)}
                                        <div className="font-monospace" style={{ position: 'absolute', right: '60px' }}>{detail.fromPrice}S$</div>
                                    </div>
                                </button>

                            </h5>
                            <div id="flush-collapseOne" className={OpenedItem === detail.id ? "accordion-collapse collapse show m-3" : "accordion-collapse collapse m-3"}>
                                <div className="accordion-body">
                                    {detail.imagePath && detail.imagePath.map(image => {
                                        return (
                                            <img src={image.original} loading="lazy" alt={'thumbnail'} width={300} height={200} className="rounded p-1" style={{ border: '2px solid grey' }} />
                                        )
                                    })}
                                    {detail.addressLine && <div className="fst-italic mt-1">{detail.addressLine}</div>}
                                    <div><small className="fw-light">{detail.description}</small></div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Main