import style from './style.module.css';

type LogoProps = {
  image: string;
  title: string;
  subtitle: string;
  onClick: () => void;
};

export function Logo({ image, title, subtitle, onClick }: LogoProps) {
  return (
    <>
      <div className={style.container} onClick={onClick}>
        <img className={style.img} src={image} alt='logo' />
        <div className={style.logo_txt}>{title}</div>
      </div>
      <div className={style.subtitle}>{subtitle}</div>
    </>
  );
}
