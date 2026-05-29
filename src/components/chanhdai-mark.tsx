export function ChanhDaiMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M48 256H0V0h48v256ZM224 256H176V0h48v256ZM176 256H48V208h128v48ZM320 256H272V0h48v256ZM464 48H320V0h144v48ZM464 256H320V208h144v48ZM512 208H464V48h48v160Z"
      />
    </svg>
  );
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 128"><path fill="${color}" d="M24 128H0V0h24v128ZM112 128H88V0h24v128ZM88 128H24V104h64v24ZM160 128H136V0h24v128ZM232 24H160V0h72v24ZM232 128H160V104h72v24ZM256 104H232V24h24v80Z"/></svg>`;
}
