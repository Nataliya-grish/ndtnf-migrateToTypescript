import BooksRepository from './bookRepository'
import "reflect-metadata";
import { Container, decorate, injectable } from "inversify";

const container = new Container();

decorate(injectable(), BooksRepository);
container.bind(BooksRepository).to(BooksRepository).inSingletonScope();

export default container