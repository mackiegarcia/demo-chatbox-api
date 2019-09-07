import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity("Users")
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column()
    public password: string;
}
