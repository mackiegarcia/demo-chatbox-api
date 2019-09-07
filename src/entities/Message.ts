import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity("Messages")
export class Message {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public userId: number;

    @Column("text")
    public msg: string;
}
