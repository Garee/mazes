import { Logo } from './logo'
import { Grid } from './mazes/grid';

export function App() {
  const grid = new Grid(4, 4);
  grid.binaryTree();
  console.log(grid.toString());

  return (
    <>
      <Logo />
      <p>Hello Vite + Preact!</p>
      <p>
        <a
          class="link"
          href="https://preactjs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Preact
        </a>
      </p>
    </>
  )
}
