import Link from "next/link"
import Image from "next/image"
import { Logo } from "./navbar"
import Discord from "../../../public/discord-white-icon.webp"

export default function Footer() {
	return (
		<footer className="bg-altBackgroundColor w-full p-5 mt-20">
			<div className="flex flex-col items-center max-w-screen-2xl mx-auto mt-10">
				<Logo />

				<ul className="flex items-center gap-5 mt-6">
					<li className=" py-2 px-4 ">Skanowanie</li>
					<li>
						<Link href="https://szablonydiscord.pl/templates">Szablony</Link>
					</li>
					<li>
						<Link href="https://szablonydiscord.pl/api/docs">API</Link>
					</li>
					<li>
						<Link href="https://szablonydiscord.pl">Home</Link>
					</li>
				</ul>

				<div className="w-full mt-5 ">
					<div className="w-full h-0.5 bg-borderColor"></div>
					<div className="flex justify-center gap-5 my-6">
						<div className="flex items-center gap-2">
							<span className="material-symbols-outlined text-primaryColor">mail</span>
							<p className="text-gray-300">szablonydiscord@gmail.com</p>
						</div>
						<div className="flex items-center gap-2">
							<span className="material-symbols-outlined text-primaryColor">location_on</span>
							<p className="text-gray-300">Polska</p>
						</div>
					</div>
					<div className="w-full h-0.5 bg-borderColor"></div>
				</div>

				<div className="mt-10 w-full bg-boxColor border border-borderColor p-2 px-4 rounded-full flex justify-between items-center max-md:flex-col  max-md:rounded-lg max-md:relative">
					<div className="flex items-center gap-2 max-md:absolute max-md:-top-5">
						<div className="p-2.5 bg-primaryColor w-fit rounded-full max-md:p-3.5">
							<Image src={Discord} alt="discord logo" className="w-5 max-md:w-6" />
						</div>
						<div className="p-2.5 bg-primaryColor w-fit rounded-full max-md:p-3.5">
							<Image src={Discord} alt="discord logo" className="w-5 max-md:w-6" />
						</div>
						<div className="p-2.5 bg-primaryColor w-fit rounded-full max-md:p-3.5">
							<Image src={Discord} alt="discord logo" className="w-5 max-md:w-6" />
						</div>
					</div>
					<p className="text-textColor max-md:mt-10">SzablonyDiscord wszystkie prawa zastrzeżone</p>
					<div className="flex items-center gap-3 text-textColor max-md:mt-5">
						<Link href="https://szablonydiscord/api/docs">API docs</Link>
						<p>|</p>
						<Link href="https://szablonydiscord/api/docs">Shizeclone</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
