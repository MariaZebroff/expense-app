

type BarProps = {bgPercent:number}

export default function Bar({bgPercent}:BarProps) {
  return (
    <div className='bar height-18 bg-[#457899]' style={{
        width: `${bgPercent}%`,
        transition: 'all 0.8s ease-in-out',
        background: bgPercent === 100? 'rgb(236, 45, 45)': '#457899',
    }}>
    </div>
  )
}
