"use client"

import Image from 'next/image';
import type { Setup } from "@/lib/interface/admin/get-webSetting"
import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { Save, X } from "lucide-react"

import { Button } from "@/components/atoms/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/form"
import { Input } from "@/components/atoms/input"
import { Textarea } from "@/components/atoms/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/atoms/tabs"
import { toast } from "@/components/atoms/use-toast"
import { Skeleton } from "@/components/atoms/skeleton"
import { ImageUploadField } from "./image-upload-field"
import { Label } from "recharts"
import { useAppDispatch } from '@/hooks';
import { fetchWebSetting, updateWebSetting, updateWebSettingFavicon, updateWebSettingLogo } from '@/lib/slices/admin/admin-webSetting-Slice';

export interface WebFormProps {
    setup?: Setup
}

export function WebForm({ setup }: WebFormProps) {
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [faviconFile, setFaviconFile] = useState<File | null>(null)

    // Use Setup as the form type, not WebFormProps
    const form = useForm<Setup>({
        defaultValues: setup || {
            id: "",
            name: "",
            tagline: "",
            description: "",
            logo: "",
            favicon: "",
            email: "",
            phone: "",
            address: "",
            social_facebook: "",
            social_instagram: "",
            social_tiktok: "",
            social_twitter: "",
            social_linkedin: "",
            social_youtube: "",
            social_whatsapp: "",
            link_video: "",
            tax_rate: 0,
            feeChannel: 0,
            feeDevelopment: 0,
        },
        mode: "onChange",
    })

    // Update form when setup changes
    useEffect(() => {
        if (setup) {
            console.log("Resetting form with setup data:", setup)
            form.reset(setup)
        }
    }, [setup, form])

    // Handle form submission Logo
    const handleLogoUpload = async (file: File | null) => {
        console.log("handleLogoUpload called with file:", file)
        if (file) {
            const formData = new FormData();
            formData.append("logo", file)
            try {
                const response = await dispatch(updateWebSettingLogo(formData))

                if (response.meta.requestStatus === 'fulfilled') {
                    toast({
                        title: "Logo uploaded",
                        description: "Your logo has been updated successfully.",
                    })
                    // Update form value with the new logo URL
                    form.setValue("logo", response.payload.logo)
                } else {
                    toast({
                        title: "Error uploading logo",
                        description: "There was a problem uploading your logo.",
                        variant: "destructive",
                    })
                }
                setLogoFile(file)
                console.log("Logo uploaded successfully:", response.payload.logo)


            } catch (error) {
                console.error("Error uploading logo:", error)


            }
        } else {
            setLogoFile(null)
            form.setValue("logo", "")
        }
    }

    // handle form submission Favicon
    const handleFaviconUpload = async (file: File | null) => {
        if (file) {
            const formData = new FormData();
            formData.append("favicon", file)
            try {
                const response = await dispatch(updateWebSettingFavicon(formData))
                if (response.meta.requestStatus === 'fulfilled') {
                    toast({
                        title: "Favicon uploaded",
                        description: "Your favicon has been updated successfully.",
                    })
                    // Update form value with the new favicon URL
                    form.setValue("favicon", response.payload.favicon)
                } else {
                    toast({
                        title: "Error uploading favicon",
                        description: "There was a problem uploading your favicon.",
                        variant: "destructive",
                    })
                }
                setFaviconFile(file)
                console.log("Favicon uploaded successfully:", response.payload.favicon)
            } catch (error) {
                console.error("Error uploading favicon:", error)
            }
        } else {
            setFaviconFile(null)
            form.setValue("favicon", "")
        }
    }

    // handle form submission data
    async function handleSubmit(data: Setup) {
        setIsSubmitting(true)
        try {
            // Create FormData object
            const formData = new FormData();
            formData.append("name", data.name)
            formData.append("tagline", data.tagline)
            formData.append("description", data.description)
            formData.append("email", data.email)
            formData.append("phone", data.phone)
            formData.append("address", data.address)
            formData.append("social_facebook", data.social_facebook || "")
            formData.append("social_instagram", data.social_instagram || "")
            formData.append("social_tiktok", data.social_tiktok || "")
            formData.append("social_twitter", data.social_twitter || "")
            formData.append("social_linkedin", data.social_linkedin || "")
            formData.append("social_youtube", data.social_youtube || "")
            formData.append("social_whatsapp", data.social_whatsapp || "")
            formData.append("link_video", data.link_video || "")
            formData.append("taxRate", String(data.tax_rate))

            // Dispatch the update action
            const response = await dispatch(updateWebSetting(formData))

            if (response.meta.requestStatus === 'fulfilled') {
                toast({
                    title: "Settings saved",
                    description: "Your website settings have been updated successfully.",
                })
                // Reset the form with new values

                dispatch(fetchWebSetting());
                console.log("Settings updated successfully:", response.payload)

            } else {
                toast({
                    title: "Error saving settings",
                    description: "There was a problem saving your settings.",
                    variant: "destructive",
                })
                console.error("Error saving settings:", response.payload.message)
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "There was a problem saving your settings.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    // Show loading state if setup is not available yet
    if (!setup) {
        return (
            <div className="container px-4 pb-8 pt-8 sm:px-8">
                <div className="mb-8">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="mt-2 h-4 w-full max-w-md" />
                </div>

                <div className="space-y-6">
                    <Skeleton className="h-10 w-full" />
                    <div className="space-y-4">
                        <Skeleton className="h-64 w-full rounded-lg" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container px-4 pb-8 pt-8 sm:px-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Website Settings</h1>
                <p className="mt-2 text-gray-600">Configure your website information and appearance.</p>
            </div>

            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8">
                    <Tabs defaultValue="basic" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="media">Media</TabsTrigger>
                            <TabsTrigger value="contact">Contact</TabsTrigger>
                            <TabsTrigger value="social">Social Media</TabsTrigger>
                            <TabsTrigger value="additional">Additional</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                    <CardDescription>Configure the basic information about your website.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        rules={{
                                            required: "Site name is required",
                                            minLength: {
                                                value: 2,
                                                message: "Site name must be at least 2 characters.",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Site Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your site name" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is the name that will appear in the browser tab and search results.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="tagline"
                                        rules={{
                                            required: "Tagline is required",
                                            minLength: {
                                                value: 2,
                                                message: "Tagline must be at least 2 characters.",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tagline</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your site tagline" {...field} />
                                                </FormControl>
                                                <FormDescription>A short phrase that describes your site.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        rules={{
                                            required: "Description is required",
                                            minLength: {
                                                value: 10,
                                                message: "Description must be at least 10 characters.",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Describe your site" className="min-h-[100px]" {...field} />
                                                </FormControl>
                                                <FormDescription>This description will be used for SEO purposes.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="media" className="mt-6">
                            <Card className="w-full max-w-4xl">
                                <CardHeader>
                                    <CardTitle>Media</CardTitle>
                                    <CardDescription>
                                        Configure your site's logo and favicon. Recommended sizes: Logo (200x200px), Favicon (32x32px).
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    {/* Logo Section */}
                                    <div className="space-y-4">
                                        <Label className="text-base font-medium">Site Logo</Label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                            {/* Logo Preview */}
                                            <div className="space-y-3">
                                                <div className="relative w-full max-w-[200px] mx-auto md:mx-0">
                                                    <div className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 p-4 flex items-center justify-center overflow-hidden">
                                                        <Image
                                                            src={form.watch("logo") || "/placeholder.svg"}
                                                            alt="Site Logo Preview"
                                                            width={160}
                                                            height={160}
                                                            className="max-w-full max-h-full object-contain rounded-md"
                                                        />
                                                    </div>
                                                    {logoFile && (
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="icon"
                                                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                                            onClick={() => {
                                                                setLogoFile(null)
                                                                form.setValue("logo", "")
                                                                console.log("Logo cleared")
                                                            }
                                                            }
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground text-center md:text-left">Current logo preview</p>
                                            </div>

                                            {/* Logo Upload Controls */}
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label className="text-sm font-medium">
                                                        Upload Logo
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="logo-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0]
                                                                if (file) {
                                                                    setLogoFile(file)
                                                                } else {
                                                                    setLogoFile(null)
                                                                }
                                                            }
                                                            }
                                                            className="file:mr-4 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                                        />
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">Supports PNG, JPG, SVG. Max size: 5MB</p>
                                                </div>

                                                <Button
                                                    type="button"
                                                    variant="default"
                                                    className="w-full sm:w-auto"
                                                    disabled={!logoFile}
                                                    onClick={() => {
                                                        handleLogoUpload(logoFile)
                                                        console.log("Saving logo:", logoFile)
                                                    }}
                                                >
                                                    <Save className="h-4 w-4 mr-2" />
                                                    Save Logo
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t" />

                                    {/* Favicon Section */}
                                    <div className="space-y-4">
                                        <Label className="text-base font-medium">Favicon</Label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                            {/* Favicon Preview */}
                                            <div className="space-y-3">
                                                <div className="relative w-full max-w-[120px] mx-auto md:mx-0">
                                                    <div className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 p-3 flex items-center justify-center overflow-hidden">
                                                        <Image
                                                            src={form.watch("favicon") || "/placeholder.svg"}
                                                            alt="Favicon Preview"
                                                            width={80}
                                                            height={80}
                                                            className="max-w-full max-h-full object-contain rounded-sm"
                                                        />
                                                    </div>
                                                    {faviconFile && (
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="icon"
                                                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                                            onClick={() => {
                                                                setFaviconFile(null)
                                                                form.setValue("favicon", "")
                                                                console.log("Favicon cleared")
                                                            }
                                                            }
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground text-center md:text-left">Current favicon preview</p>
                                            </div>

                                            {/* Favicon Upload Controls */}
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label className="text-sm font-medium">
                                                        Upload Favicon
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="favicon-upload"
                                                            type="file"
                                                            accept="image/*,.ico"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0]
                                                                if (file) {
                                                                    setFaviconFile(file)
                                                                } else {
                                                                    setFaviconFile(null)
                                                                }
                                                            }
                                                            }
                                                            className="file:mr-4 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                                        />
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">Supports ICO, PNG, JPG. Recommended: 32x32px</p>
                                                </div>

                                                <Button
                                                    type="button"
                                                    variant="default"
                                                    className="w-full sm:w-auto"
                                                    disabled={!faviconFile}
                                                    onClick={() => {
                                                        handleFaviconUpload(faviconFile)
                                                        console.log("Saving favicon:", faviconFile)
                                                    }}
                                                >
                                                    <Save className="h-4 w-4 mr-2" />
                                                    Save Favicon
                                                </Button>
                                            </div>
                                        </div>
                                    </div>


                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="contact" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                    <CardDescription>Configure your contact details.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        rules={{
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Please enter a valid email address.",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="contact@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        rules={{
                                            required: "Phone number is required",
                                            minLength: {
                                                value: 6,
                                                message: "Please enter a valid phone number.",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+1234567890" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="address"
                                        rules={{
                                            required: "Address is required",
                                            minLength: {
                                                value: 5,
                                                message: "Address must be at least 5 characters.",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="123 Main St, City, Country" className="min-h-[80px]" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="social" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Social Media</CardTitle>
                                    <CardDescription>Configure your social media links.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="social_facebook"
                                            rules={{
                                                pattern: {
                                                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                    message: "Please enter a valid URL.",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Facebook</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://facebook.com/yourpage" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="social_instagram"
                                            rules={{
                                                pattern: {
                                                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                    message: "Please enter a valid URL.",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Instagram</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://instagram.com/yourpage" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="social_tiktok"
                                            rules={{
                                                pattern: {
                                                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                    message: "Please enter a valid URL.",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>TikTok</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://tiktok.com/@yourpage" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="social_twitter"
                                            rules={{
                                                pattern: {
                                                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                    message: "Please enter a valid URL.",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Twitter</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://twitter.com/yourpage" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="social_linkedin"
                                            rules={{
                                                pattern: {
                                                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                    message: "Please enter a valid URL.",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>LinkedIn</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="social_youtube"
                                            rules={{
                                                pattern: {
                                                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                    message: "Please enter a valid URL.",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>YouTube</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://youtube.com/yourchannel" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="social_whatsapp"
                                        rules={{
                                            pattern: {
                                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                message: "Please enter a valid URL.",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>WhatsApp</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://wa.me/1234567890" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="additional" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Additional Settings</CardTitle>
                                    <CardDescription>Configure additional site settings.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="link_video"
                                        rules={{
                                            pattern: {
                                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                message: "Please enter a valid URL.",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Video Link</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://example.com/video" {...field} />
                                                </FormControl>
                                                <FormDescription>URL to a promotional or instructional video.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="tax_rate"
                                        rules={{
                                            required: "Tax rate is required",
                                            min: {
                                                value: 0,
                                                message: "Tax rate must be at least 0.",
                                            },
                                            max: {
                                                value: 1,
                                                message: "Tax rate must be at most 1.",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tax Rate</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        max="1"
                                                        placeholder="0.11"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormDescription>Tax rate as a decimal (e.g., 0.11 for 11%).</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="feeChannel"
                                        rules={{
                                            required: "Channel fee is required",
                                            min: {
                                                value: 0,
                                                message: "Channel fee must be at least 0.",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Channel Fee</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        placeholder="0.00"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormDescription>Fee charged per channel.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="feeDevelopment"
                                        rules={{
                                            required: "Development fee is required",
                                            min: {
                                                value: 0,
                                                message: "Development fee must be at least 0.",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Development Fee</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        placeholder="0.00"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormDescription>Fee charged for development services.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto">
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    Saving...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    Save Configuration
                                </span>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
