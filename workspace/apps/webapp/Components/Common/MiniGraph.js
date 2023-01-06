import {
    LineChart,
    Line,
    ResponsiveContainer,
} from 'recharts';

const MiniGraph = ({ data }) => {

    return (

        <>
            <ResponsiveContainer
                width="100%"
                height="auto"
                aspect={ 2.5 }
            >
                <LineChart
                    width={ 250 }
                    height={ 100 }
                    data={ data }
                    style={{
                        fontSize: 'clamp(0.75rem, 0.6rem + 1vw, 1rem)'
                    }}
                >
                    <Line
                        dot={ false }
                        type="monotone"
                        dataKey="point"
                        // stroke="#8884d8"
                        // stroke="#ff3d00"
                        stroke="#00e676"
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default MiniGraph;