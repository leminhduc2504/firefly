import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    lastname: string

    @Column()
    firstname: string

    @Column()
    age: number

    @Column()
    coordinate: string
}