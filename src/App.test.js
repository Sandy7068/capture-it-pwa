import { render,screen } from "@testing-library/react"
import App from './App';
test('Header Visible', ()=>{
    render(<App/>);
    const headerElement = document.getElementById('capture-header')
    expect(headerElement).toBeInTheDocument();
})