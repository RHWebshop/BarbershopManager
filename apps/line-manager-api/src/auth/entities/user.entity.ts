import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    phone: string;

    @Column({ nullable: true })
    name: string;

    @Column({ type: 'date', nullable: true })
    dob: Date;

    @Column({ nullable: true })
    gender: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
