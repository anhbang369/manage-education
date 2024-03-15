import React from 'react';
import { useState } from 'react';
import "./syllabusCreate.css"

const SyllabusCreate = () => {

    const [selected, setSelected] = useState(null)
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }

        setSelected(i)
    }

    return (
        <>
            <div className="wrapper">
                <div className='accordion'>
                    {data.map((item, i) => (
                        <div className='item'>
                            <div className='title' onClick={() => toggle(i)}><h1>{item.question}</h1></div>
                            <div className={selected === i ? 'content show' : 'content'}>{item.answer}</div>
                        </div>
                    ))}

                </div>
            </div>

        </>
    )
}

const data = [
    {
        question: "Question 1",
        answer: "Long-form content is any piece of written content that's over 1,000 words in length. Some people will quibble about the exact word count, but almost everyone agrees that short-form content is always under 1,000 words. That means a good long-form content benchmark is 1,000 words or over."
    },
    {
        question: "Question 2",
        answer: "Long-form content is any piece of written content that's over 1,000 words in length. Some people will quibble about the exact word count, but almost everyone agrees that short-form content is always under 1,000 words. That means a good long-form content benchmark is 1,000 words or over."
    },
    {
        question: "Question 3",
        answer: "Long-form content is any piece of written content that's over 1,000 words in length. Some people will quibble about the exact word count, but almost everyone agrees that short-form content is always under 1,000 words. That means a good long-form content benchmark is 1,000 words or over."
    },
    {
        question: "Question 4",
        answer: "Long-form content is any piece of written content that's over 1,000 words in length. Some people will quibble about the exact word count, but almost everyone agrees that short-form content is always under 1,000 words. That means a good long-form content benchmark is 1,000 words or over."
    },
]

export default SyllabusCreate