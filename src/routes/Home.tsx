import Button from "../components/Button"

const Home = () => {
    return (
        <>
            <h1 className='text-center font-bold text-3xl mb-4'>Quizzical</h1>
            <p className='italic mb-3'>Ready to test your knowledge?</p>
            <Button
                to='/getting-ready'
                text='Start'
            />
        </>
    )
}

export default Home;