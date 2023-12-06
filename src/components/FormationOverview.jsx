import React from 'react'

const FormationOverview = ({features}) => {
    return (
        <div className='flex flex-col gap-5'>
          <p className='text-lg text-[#cbcbcb] font-semibold'>
            Explore the formation and player details for your team:
          </p>
          <ul className='flex flex-col gap-5'>
            {features.map((feature, index) => (
                <li key={index}>
                    <strong className="text-[#fea013]">{feature.title}</strong>
                    <p className="text-lg text-[#fff] font-normal">{feature.description}</p>
                </li>
            ))}
          </ul>
        </div>
      );
}

export default FormationOverview