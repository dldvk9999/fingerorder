import Image from "next/image";

export default function Img(name: string, width: number, height: number, style: string = "") {
    return (
        <Image src={"/" + name + ".webp"} alt={name} width={width} height={height} className={style} loading="lazy" />
    );
}
