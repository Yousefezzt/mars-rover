import { useState } from 'react';

export default function MarsRover() {
    const [position, setPosition] = useState(0);
    const [input, setInput] = useState('');

    const moveDot = () => {
        let newPosition = position;

        const moves = {
            'F': () => newPosition = Math.max(newPosition - 10, 0),
            'B': () => newPosition = Math.min(newPosition + 10, 99),
            'L': () => newPosition = newPosition % 10 !== 0 ? newPosition - 1 : newPosition,
            'R': () => newPosition = (newPosition + 1) % 10 !== 0 ? newPosition + 1 : newPosition
        };

        input.toUpperCase().split('').forEach(char => {
            if (![43, 51, 57].includes(newPosition)) {
                moves[char]?.();
            }
        });

        setPosition(newPosition);
        setInput('');
    };

    const column = position % 10;
    const row = 9 - Math.floor(position / 10);

    return (
        <>
            <div className="flex justify-center items-center ">
                <input
                    type="text"
                    placeholder="Type direction (F, B, L, R)"
                    className="input border-green-500 outline-none m-1 my-5"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="btn btn-success px-10 m-3" onClick={moveDot}>
                    Send
                </button>
                <h3 className='bg-emerald-500 rounded-md py-1 px-4'>{`${column} / ${row}`}</h3>
            </div>


            <div className="container w-[80%] m-auto bg-slate-500">
                <div className="bg-slate-400 grid rounded-2xl grid-cols-10 h-[450px] gap-[2px]">
                    {[...Array(100)].map((_, index) => (
                        <div
                            key={index}
                            className={`text-center text-white bg-blue-300 ${index === position ? 'bg-red-500' : ''}`}
                        >
                            {index === position ? '●' : `${index % 10} / ${9 - Math.floor(index / 10)}`}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
