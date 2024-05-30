import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

function ChartJS({ id, type, borderColor }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const data = {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            datasets: [{
                label: 'Nouveaux clients',
                data: [20, 30, 50, 75, 150, 85, 77, 120, 187, 85, 153, 950],
                fill: false,
                borderColor: {borderColor},
                tension: 0.1
            }]
        };

        const chart = new Chart(ctx, {
            type: type,
            data: data,
            options: {
                onClick: (e) => {
                    const canvasPosition = getRelativePosition(e, chart);

                    // Substitute the appropriate scale IDs
                    const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
                    const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
                    console.log(`X: ${dataX}, Y: ${dataY}`);
                }
            }
        });

        return () => {
            chart.destroy();
        };
    }, [type]);

    return (
        <div>
            <canvas id={id} ref={chartRef}></canvas>
        </div>
    );
}

export default ChartJS;
