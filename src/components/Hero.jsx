import avatar from '../assets/owner.jpg'
import github from '../assets/github_icon.png'
import facebook from '../assets/facebook_icon.png'
import twitter from '../assets/twitter_icon.png'
import linkedIn from '../assets/linkedIn_icon.png'
import medium from '../assets/medium_icon.png'
import { setAlert, setGlobalState, useGlobalState } from '../store/index'
import { payToMint } from '../Avatar'

const Hero = () => {
    const [nfts] = useGlobalState('nfts')


    //fucntion for minting an nft
    const onMintNFT = async () => {
        setGlobalState('loading', {
            show: true,
            msg: 'Minting new NFT to your account',
        })

        //onSuccess
        await payToMint()
            .then(() => setAlert('Minting Successful...', 'green'))
            .catch(() => setGlobalState('loading', { show: false, msg: '' }))
    }

    return (
        <div
        //     className="bg-[url('https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416_960_720.png')]
        // bg-no-repeat bg-cover"
        className="bg-[url('https://pixabay.com/photos/snow-winter-cold-frost-wintry-7634083/')]
        bg-no-repeat bg-cover"
        >
            <div className="flex flex-col justify-center items-center mx-auto py-10">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-white text-5xl font-bold text-center">
                        <span className="text-gradient">NFTs</span> Collection
                    </h1>

                    <p className="text-white font-semibold text-sm mt-3">
                        Mint and collect the hottest NFTs around.
                    </p>

                    <button
                        className="shadow-xl shadow-black text-white font-semibold
            bg-[#f00404] hover:bg-[#f703eb] p-4
            rounded-full cursor-pointer my-8"
                        onClick={onMintNFT}
                    >
                        Mint Your NFT Here
                    </button>
                    <ul className="flex flex-row justify-center space-x-2 items-center my-4">
                        <a
                            className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
                            href="https://github.com/Rkvishnu"
                        >
                            <img className="w-7 h-7" src={github} alt="Github" />
                        </a>
                        <a
                            className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
                            href="https://www.linkedin.com/in/rkvishnu91"
                        >
                            <img className="w-7 h-7" src={linkedIn} alt="linkedIn" />
                        </a>
                        <a
                            className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
                        // href="https://fb.com/darlington.gospel01"
                        >
                            <img className="w-7 h-7" src={facebook} alt="facebook" />
                        </a>
                        <a
                            className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
                            href="https://twitter.com/Rkvishnu91"
                        >
                            <img className="w-7 h-7" src={twitter} alt="twitter" />
                        </a>

                    </ul>

                    <div
                        className="shadow-xl shadow-black flex flex-row
            justify-center items-center w-50 h-10 rounded-full
          bg-white cursor-pointer p-3 ml-4 text-black 
            hover:bg-[#bd255f] hover:text-white transition-all
            duration-75 delay-100"
                    >
                        <span className="text-xl text-[#42d409] font-bold">{nfts.length}/101 </span>
                        <div className="mx-4 font-semibold">
                        have been minted
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
