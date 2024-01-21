'use client'
const ButtonComponent = ({ text, callback }: { text: string, callback: (() => any) | null }) => {
    return (
        <button
            className={'shrink-0 bg-[#FFDEB9] rounded-[90px] border-[5px] border-black p-4 hover:bg-[#fe6344] active:bg-[#fc2947] font-[Bahnschrift] uppercase overflow-clip text-black'}
            onClick={() => { callback && callback() }}>
            {text}
        </button>
    )
}

export default ButtonComponent